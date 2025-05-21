import axios from "axios";

class User {
  constructor() {
    if (!User.instance) {
      User.instance = this;
    }
    return User.instance;
  }

  async register(name, user, email, telp, password, conPassword) {
    if (Object.values(arguments).some((arg) => arg.trim() === "")) {
      return alert("Isi semua data");
    }

    const cek = await axios.get(`http://localhost:3000/user?email=${email}`);

    if (cek.status === 200 && cek.data.length > 0) {
      console.log("Ada");
      return alert("Email sudah terdaftar!");
    }

    if (password.length <= 8) {
      return alert("Password minimal 8 karakter");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      return alert(
        "Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus"
      );
    }

    if (password !== conPassword) {
      return alert("Konfirmasi password tidak cocok");
    }

    const result = await axios.post("http://localhost:3000/user", {
      name: name,
      username: user,
      email: email,
      telp: telp,
      password: password,
    });

    if (result.status === 201) {
      console.log("Berhasil!");
      alert("Berhasil mendaftar!");
      return true;
    } else {
      console.log("Gagal!");
      return false;
    }
  }

  async login(user, password) {
    if (Object.values(arguments).some((arg) => arg.trim() === "")) {
      return alert("Isi semua data");
    }

    const userParam = encodeURIComponent(user);
    const passParam = encodeURIComponent(password);

    let result = await axios.get(
      `http://localhost:3000/user?username=${userParam}&password=${passParam}`
    );

    if (!(result.status === 200 && result.data.length > 0)) {
      result = await axios.get(
        `http://localhost:3000/user?email=${userParam}&password=${passParam}`
      );
    }

    if (result.status === 200 && result.data.length > 0) {
      const userData = result.data[0];
      console.log("Berhasil!");
      localStorage.setItem("user-info", JSON.stringify(userData));
      return true;
    } else {
      console.log("Gagal!");
      return false;
    }
  }

  async logout() {
    localStorage.removeItem("user-info");
    console.log("Logout berhasil!");
  }

  async getUser() {
    const user = localStorage.getItem("user-info");
    if (user) {
      const userObj = JSON.parse(user);
      const result = await axios.get(
        `http://localhost:3000/user?email=${userObj.email}`
      );

      if (result.status === 200 && result.data.length > 0) {
        const userData = result.data[0];
        console.log("Berhasil!");
        return {
          nama: userData.name,
          email: userData.email,
          username: userData.username,
          telp: userData.telp,
        };
      } else {
        console.log("Gagal!");
      }
    } else {
      return null;
    }
  }

  async updateProfile(data) {
    const user = localStorage.getItem("user-info");
    if (!user) {
      alert("User tidak ditemukan!");
      return false;
    }
    const userObj = JSON.parse(user);
    try {
      const result = await axios.put(
        `http://localhost:3000/user/${userObj.id}`,
        data
      );
      if (result.status === 200) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        return true;
      } else {
        alert("Gagal update profil!");
        return false;
      }
    } catch (err) {
      alert("Terjadi kesalahan saat update profil!");
      return false;
    }
  }

  async changePassword(newPassword, confirmPassword) {
    const user = localStorage.getItem("user-info");
    if (!user) {
      alert("User tidak ditemukan!");
      return false;
    }
    const userObj = JSON.parse(user);

    if (Object.values(arguments).some((arg) => arg.trim() === "")) {
      alert("Semua wajib diisi!");
      return false;
    }

    if (newPassword.length <= 8) {
      return alert("Password minimal 8 karakter");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password harus minimal 8 karakter, mengandung huruf besar, kecil, angka, dan karakter khusus!"
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      alert("Konfirmasi password tidak cocok!");
      return false;
    }

    try {
      const result = await axios.get(
        `http://localhost:3000/user?username=${userObj.username}`
      );
      if (result.status === 200 && result.data.length > 0) {
        const userFromReq = result.data[0];
        if (userFromReq.password === newPassword) {
          alert("Password baru tidak boleh sama dengan password lama!");
          return false;
        }

        const updateResult = await axios.put(
          `http://localhost:3000/user/${userFromReq.id}`,
          { ...userFromReq, password: newPassword }
        );
        if (updateResult.status === 200) {
          localStorage.setItem("user-info", JSON.stringify(updateResult.data));
          return true;
        } else {
          alert("Gagal update password!");
          return false;
        }
      } else {
        alert("User tidak ditemukan di database!");
        return false;
      }
    } catch (err) {
      alert("Terjadi kesalahan saat update password!");
      return false;
    }
  }
}

const instance = new User();
Object.freeze(instance);
export default instance;
