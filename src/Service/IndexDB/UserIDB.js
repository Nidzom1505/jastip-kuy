import { dbPromise } from "./IndexDB";

class UserIDB {
  constructor() {
    if (!UserIDB.instance) {
      UserIDB.instance = this;
    }
    return UserIDB.instance;
  }

  async register(name, username, email, telp, password, conPassword) {
    if (
      [name, username, email, telp, password, conPassword].some(
        (arg) => !arg || arg.trim() === ""
      )
    ) {
      alert("Isi semua data");
      return false;
    }

    const db = await dbPromise;
    const users = await db.getAll("user");
    if (users.some((u) => u.email === email)) {
      alert("Email sudah terdaftar!");
      return false;
    }

    if (password.length < 8) {
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

    const id = await db.add("user", { name, username, email, telp, password });
    if (id) {
      alert("Berhasil mendaftar!");
      return true;
    } else {
      alert("Gagal mendaftar!");
      return false;
    }
  }

  async login(user, password) {
    if ([user, password].some((arg) => !arg || arg.trim() === "")) {
      alert("Isi semua data");
      return false;
    }
    const db = await dbPromise;
    let users = await db.getAll("user");
    let userData = users.find(
      (u) =>
        (u.username === user || u.email === user) && u.password === password
    );
    if (userData) {
      localStorage.setItem("user-info", JSON.stringify(userData));
      return true;
    } else {
      alert("Username/email atau password salah!");
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
      const db = await dbPromise;
      const users = await db.getAll("user");
      const userData = users.find((u) => u.email === userObj.email);
      if (userData) {
        return {
          nama: userData.name,
          email: userData.email,
          username: userData.username,
          telp: userData.telp,
        };
      }
    }
    return null;
  }

  async updateProfile(data) {
    const user = localStorage.getItem("user-info");
    if (!user) {
      alert("User tidak ditemukan!");
      return false;
    }
    const userObj = JSON.parse(user);
    try {
      const db = await dbPromise;
      const userData = await db.get("user", userObj.id);
      if (!userData) {
        alert("User tidak ditemukan!");
        return false;
      }
      const updated = { ...userData, ...data };
      await db.put("user", updated);
      localStorage.setItem("user-info", JSON.stringify(updated));
      return true;
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

    if (
      [newPassword, confirmPassword].some((arg) => !arg || arg.trim() === "")
    ) {
      alert("Semua wajib diisi!");
      return false;
    }

    if (newPassword.length < 8) {
      alert("Password minimal 8 karakter");
      return false;
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

    const db = await dbPromise;
    const userData = await db.get("user", userObj.id);
    if (userData.password === newPassword) {
      alert("Password baru tidak boleh sama dengan password lama!");
      return false;
    }

    try {
      const updated = { ...userData, password: newPassword };
      await db.put("user", updated);
      localStorage.setItem("user-info", JSON.stringify(updated));
      return true;
    } catch (err) {
      alert("Gagal update password!");
      return false;
    }
  }
}

const instance = new UserIDB();
Object.freeze(instance);
export default instance;
