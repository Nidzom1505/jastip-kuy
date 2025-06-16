class Auth {
  constructor() {
    this.user = localStorage.getItem("token");
  }

  async checkLogin(vm) {
    try {
      if (!this.user) {
        vm.$router.push("/login");
      }
    } catch (error) {
      console.error("Data di localStorage tidak valid:", error);
      vm.$router.push("/login");
    }
  }

  async checkToken(vm) {
    try {
      if (this.user) {
        vm.$router.push("/");
      }
    } catch (error) {
      console.error("Data di localStorage tidak valid:", error);
      vm.$router.push("/login");
    }
  }
}

export default new Auth();
