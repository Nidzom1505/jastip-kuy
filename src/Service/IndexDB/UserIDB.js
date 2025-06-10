import { dbPromise } from "./IndexDB";

class UserIDB {
  constructor() {
    if (!UserIDB.instance) {
      UserIDB.instance = this;
    }
    return UserIDB.instance;
  }

  async register(name, username, email, telp, password, conPassword, router) {
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
      if (router) router.push("/login");
      return true;
    } else {
      alert("Gagal mendaftar!");
      return false;
    }
  }

  async login(user, password, router) {
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

  async getAllUsers() {
    const db = await dbPromise;
    return db.getAll("user");
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

    const db = await dbPromise;
    const userData = await db.get("user", userId);
    if (!userData) {
      alert("User tidak ditemukan!");
      return false;
    }

    const updated = {
      ...userData,
      nama: user.nama,
      email: user.email,
      username: user.username,
      telp: user.telp,
    };
    await db.put("user", updated);
    localStorage.setItem("user-info", JSON.stringify(updated));
    alert("Profil berhasil diupdate!");
    if (router) router.push("/profile");
    return true;
  }

  async changePassword(newPassword, confirmPassword, router) {
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
      if (router) router.push("/profile");
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
