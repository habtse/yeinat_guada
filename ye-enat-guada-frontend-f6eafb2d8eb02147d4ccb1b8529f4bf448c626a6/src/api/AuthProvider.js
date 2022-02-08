import axios from "axios";

export class UserRole {
    static ADMIN = "admin";
    static CUSTOMER = "customer";
    static PROVIDER = "provider";
}

export class User {
    constructor(
        id,
        username,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        avatarURL
    ) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.avatarURL = avatarURL;
        this.phoneNumber = phoneNumber;
    }
}

const API_URL = "http://localhost:8000/api";
export const DJANGO_API_URL = "http://localhost:8000";

export class AuthProvider {
    static getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    static getAuthToken() {
        return localStorage.getItem("authToken");
    }

    static isAuthenticated() {
        return (
            localStorage.getItem("authToken") !== null &&
            localStorage.getItem("user") !== null
        );
    }

    static logout() {
        return new Promise((resolve) => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            resolve();
        });
    }

    static login(username, password) {
        return axios
            .post(`${API_URL}/login/`, { username: username, password: password })
            .then((response) => {
                localStorage.setItem("authToken", response.data.access);
                return axios
                    .get(`${API_URL}/user-detail`, {
                        headers: { Authorization: `Bearer ${response.data.access}` },
                    })
                    .then((response) => {
                        const resUser = response.data;
                        const user = new User(
                            resUser.user.id,
                            resUser.user.username,
                            resUser.user.first_name,
                            resUser.user.last_name,
                            resUser.user.email,
                            resUser.phone_number,
                            resUser.user.user_type,
                            resUser.image
                        );
                        localStorage.setItem("user", JSON.stringify(user));
                        return response.data;
                    });
            });
    }

    // On file upload (click the upload button)
    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Details of the uploaded file
        console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        axios.post("api/uploadfile", formData);
    };

    static registerAsCustomer(registrationInfo) {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "image",
            registrationInfo.image,
            registrationInfo.image.name
        );

        let user = {};
        user.username = registrationInfo.username;
        user.first_name = registrationInfo.firstname;
        user.last_name = registrationInfo.lastname;
        user.email = registrationInfo.email;
        user.password = registrationInfo.password;

        formData.append("user", JSON.stringify(user));
        formData.append("phone_number", registrationInfo.phone_number);

        // TODO : remove this
        formData.append("rating", 0);

        // Request made to the backend api
        // Send formData object
        return axios.post(`${API_URL}/register-customer/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }

    static registerAsProvider(registrationInfo) {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "image",
            registrationInfo.image,
            registrationInfo.image.name
        );

        let user = {};
        user.username = registrationInfo.username;
        user.first_name = registrationInfo.firstname;
        user.last_name = registrationInfo.lastname;
        user.email = registrationInfo.email;
        user.password = registrationInfo.password;

        formData.append("user", JSON.stringify(user));
        formData.append("phone_number", registrationInfo.phone_number);
        formData.append("long", registrationInfo.long);
        formData.append("lat", registrationInfo.lat);

        // TODO : remove this
        formData.append("rating", 0);

        // Request made to the backend api
        // Send formData object
        return axios.post(`${API_URL}/register-vendor/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }
}
