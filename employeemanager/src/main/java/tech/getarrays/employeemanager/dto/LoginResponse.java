package tech.getarrays.employeemanager.dto;

public class LoginResponse {
    private String message;
//    private String authorization;

    public LoginResponse(String message){
        this.message = message;
//        this.authorization = authorization;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

//    public String getAuthorization() {
//        return authorization;
//    }
//
//    public void setAuthorization(String authorization) {
//        this.authorization = authorization;
//    }
}
