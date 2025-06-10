import axios from "axios";

class User {
  constructor() {
    if (!User.instance) {
      User.instance = this;
    }
    return User.instance;
  }

  async register(name, user, email, telp, password, conPassword, router) {
    if (
      [name, user, email, telp, password, conPassword].some(
        (arg) => typeof arg !== "string" || arg.trim() === ""
      )
    ) {
      return alert("Isi semua data");
    }

    const cek = await axios.get(`http://localhost:3000/user?email=${email}`);

    if (cek.status === 200 && cek.data.length > 0) {
      alert("Email sudah terdaftar!");
      return false;
    }

    if (password.length <= 8) {
      alert("Password minimal 8 karakter");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "Password harus mengandung minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus"
      );
      return false;
    }

    if (password !== conPassword) {
      alert("Konfirmasi password tidak cocok");
      return false;
    }

    const result = await axios.post("http://localhost:3000/user", {
      name: name,
      username: user,
      email: email,
      telp: telp,
      password: password,
    });

    if (result.status === 201) {
      alert("Berhasil mendaftar!");
      if (router) router.push("/login");
      return true;
    } else {
      console.log("Gagal!");
      return false;
    }
  }

  async login(user, password, router) {
    if (
      [user, password].some(
        (arg) => typeof arg !== "string" || arg.trim() === ""
      )
    ) {
      alert("Isi semua data");
      return false;
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
      localStorage.setItem("user-info", JSON.stringify(userData));
      if (router) router.push("/");
      return true;
    } else {
      alert("username dan password Anda salah!");
      return false;
    }
  }

  async logout(router) {
    localStorage.removeItem("user-info");
    if (router) router.push("/login");
    return true;
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

  async getAllUsers() {
    try {
      const result = await axios.get("http://localhost:3000/user");
      if (result.status === 200) {
        return result.data;
      } else {
        alert("Gagal mengambil data user!");
        return [];
      }
    } catch (err) {
      console.error("Error saat mengambil semua user:", err);
      alert("Terjadi kesalahan saat mengambil data user!");
      return [];
    }
  }

  async updateProfile(user, router) {
    if (!user.nama || !user.email) {
      alert("Nama dan email wajib diisi!");
      return false;
    }

    const allUsers = await this.getAllUsers();
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    const userId = userInfo?.id;

    const emailUsed = allUsers.find(
      (u) => u.email === user.email && u.id !== userId
    );
    if (emailUsed) {
      alert("Email sudah digunakan oleh akun lain!");
      return false;
    }

    const result = await axios.put(`http://localhost:3000/user/${userId}`, {
      name: user.nama,
      email: user.email,
      username: user.username,
      telp: user.telp,
      password: userInfo.password,
    });
    if (result.status === 200) {
      localStorage.setItem("user-info", JSON.stringify(result.data));
      alert("Profil berhasil diupdate!");
      if (router) router.push("/profile");
      return true;
    } else {
      alert("Gagal update profil!");
      return false;
    }
  }

  async changePassword(newPassword, confirmPassword, router) {
    const user = localStorage.getItem("user-info");
    if (!user) {
      alert("User tidak ditemukan!");
      return false;
    }
    const userObj = JSON.parse(user);

    if (
      [newPassword, confirmPassword].some(
        (arg) => typeof arg !== "string" || arg.trim() === ""
      )
    ) {
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
          if (router) router.push("/profile");
          return true;
        } else {
          alert("Gagal update password!");
          return false;
        }
      } else {
        alert("User tidak ditemukan!");
        return false;
      }
    } catch (err) {
      alert("Terjadi kesalahan!");
      return false;
    }
  }
}

const instance = new User();
Object.freeze(instance);
export default instance;
