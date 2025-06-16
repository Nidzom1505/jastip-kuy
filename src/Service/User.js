import axios from "axios";

class User {
  constructor() {
    this.url = "https://elephant-storm-pairs-ensures.trycloudflare.com/";
    this.token= localStorage.getItem("token");
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

    const cek = await axios.get(
      `${this.url}api/cek-email?email=${email}`
    );

    const hasil = cek.data.available;

    if (cek.status === 200 && hasil === false) {
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

    const result = await axios.post(`${this.url}api/register`, {
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

    // const userParam = encodeURIComponent(user);
    // const passParam = encodeURIComponent(password);

    // let result = await axios.get(
    //   `http://localhost:3000/user?username=${userParam}&password=${passParam}`
    // );

    // if (!(result.status === 200 && result.data.length > 0)) {
    // }
    try {
      const result = await axios.post(`${this.url}api/login`, {
        email: user,
        password: password,
      });

      if (result.status === 200) {
        const create = result.data.data.token;
        localStorage.setItem("token", create);

        if (router) router.push("/");
        return true;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Email atau password Anda salah!");
      } else {
        alert("Terjadi kesalahan saat login.");
      }
      return false;
    }
  }

  async logout(router) {
    if (!this.token) {
      alert("Token tidak ditemukan");
      if (router) router.push("/login");
      return false;
    }

    try {
      await axios.post(
        `${this.url}api/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      localStorage.removeItem("token");
      alert("Berhasil logout");
      if (router) router.push("/login");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      alert("Gagal logout dari server");
      return false;
    }
  }

  async getUser() {
    if (this.token) {
      const result = await axios.get(`${this.url}api/user`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });

      if (result.status === 200 && result.data) {
        const userData = result.data;
        console.log("Berhasil!");
        return {
          nama: userData.name,
          email: userData.email,
          username: userData.username,
          telp: userData.telp,
          id: userData.id,
        };
      } else {
        console.log("Gagal!");
      }
    } else {
      return null;
    }
  }

  async updateProfile(user, router) {
    if (!user.nama || !user.email) {
      alert("Nama dan email wajib diisi!");
      return false;
    }

    const userData = await this.getUser();

    const cek = await axios.get(
      `${this.url}api/cek-email?email=${user.email}&exclude=${userData.id}`
    );

    const hasil = cek.data.available;
    if (cek.status === 200 && hasil === false) {
      alert("Email sudah terdaftar!");
      return false;
    }

    const result = await axios.put(
      `${this.url}api/user/update`,
      {
        name: user.nama,
        email: user.email,
        username: user.username,
        telp: user.telp,
      },
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          Accept: "application/json",
        },
      }
    );
    if (result.status === 200) {
      alert("Profil berhasil diupdate!");
      if (router) router.push("/profile");
      return true;
    } else {
      alert("Gagal update profil!");
      return false;
    }
  }

  async changePassword(newPassword, confirmPassword, router) {
    if (!this.token) {
      alert("User tidak ditemukan!");
      return false;
    }

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
      const response = await axios.put(
        `${this.url}api/user/update-password`,
        {
          passwordBaru: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Password berhasil diganti!");
        if (router) router.push("/profile");
        return true;
      } else {
        alert(response.data.message || "Gagal mengganti password");
        return false;
      }
    } catch (error) {
      alert(error.response?.data?.message || "Terjadi kesalahan");
      return false;
    }
  }
}

const instance = new User();
Object.freeze(instance);
export default instance;
