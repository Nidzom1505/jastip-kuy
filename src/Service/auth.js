class Auth {
  async checkLogin(vm) {
    try {
      const user = JSON.parse(localStorage.getItem("user-info"));
      if (!user) {
        vm.$router.push("/login");
      }
    } catch (error) {
      console.error("Data di localStorage tidak valid:", error);
      vm.$router.push("/login");
    }
  }

  async checkToken(vm) {
    try {
      const user = JSON.parse(localStorage.getItem("user-info"));
      if (user) {
        vm.$router.push("/");
      }
    } catch (error) {
      console.error("Data di localStorage tidak valid:", error);
      vm.$router.push("/login");
    }
  }
}

export default new Auth();
