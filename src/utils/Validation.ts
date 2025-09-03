import { endpointBe } from "./contant";


// Hàm check email xem tồn tại chưa
export const checkExistEmail = async (setErrorEmail: any, email: string) => {
   const endpoint = endpointBe + `/auth/search/existsByEmail?email=${email}`;
   // Call api
   try {
      const response = await fetch(endpoint);
      const data = await response.text();
      if (data === "true") {
         setErrorEmail("Email đã tồn tại!");
         return true;
      }
      return false;
   } catch (error) {
      console.log("Lỗi api khi gọi hàm kiểm tra email");
   }
};

// Hàm check username xem tồn tại chưa
export const checkExistUsername = async (setErrorUsername: any, name: string) => {
   if (name.trim() === "") {
      return false;
   }
   if (name.trim().length < 8) {
      setErrorUsername("Tên đăng nhập phải chứa ít nhất 8 ký tự");
      return true;
   }
   const endpoint = endpointBe + `/auth/search/existsByUsername?name=${name}`;
   // Call api
   try {
      const response = await fetch(endpoint);
      const data = await response.text();

      if (data === "true") {
         setErrorUsername("Username đã tồn tại!");
         return true;
      }
      return false;
   } catch (error) {
      console.log("Lỗi api khi gọi hàm kiểm tra username");
   }
};

// Hàm check mật khẩu có đúng định dạng không
export const checkPassword = (setErrorPassword: any, password: string) => {
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
   if (password === "") {
      return false;
   } else if (!passwordRegex.test(password)) {
      setErrorPassword(
         "Mật khẩu phải có ít nhất 8 ký tự và bao gồm chữ và số."
      );
      return true;
   } else {
      setErrorPassword("");
      return false;
   }
};

// Hàm check mật khẩu nhập lại
export const checkRepeatPassword = (setErrorRepeatPassword: any, repeatPassword: string, password: string) => {
   if (repeatPassword !== password) {
      setErrorRepeatPassword("Mật khẩu không khớp.");
      return true;
   } else {
      setErrorRepeatPassword("");
      return false;
   }
};

