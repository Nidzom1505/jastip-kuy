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
    //go to API
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

    const result = await axios.get(
      `http://localhost:3000/user?identifier=${user}&password=${password}`
    );

    if (result.status === 200 && result.data.length > 0) {
      const userData = result.data[0];
      console.log("Berhasil!");
      localStorage.setItem("user-info", JSON.stringify(userData));
      return true;
    } else {
      console.log("Gagal!");
    }
  }

  async logout() {
    localStorage.removeItem("user-info");
    console.log("Logout berhasil!");
  }
}

const instance = new User();
Object.freeze(instance);
export default instance;
