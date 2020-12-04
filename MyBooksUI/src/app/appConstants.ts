export class AppConstants {
    
    // http://localhost:8079/favourite-service/
    //http://localhost:8079/user-service/api/v1/auth/login

    public static get USER_SERVICE(): string { return "http://192.168.1.16:8079/user-service/api/v1/auth"; }
    public static get BOOK_API(): string { return "https://openlibrary.org/subjects/time:20th_century.json?limit=20"; }

    // public static get BOOK_API(): string { return "https://openlibrary.org/subjects/space_flight.json?limit=20&offset=1"; }

    public static get FAVOURITE_API_URL(): string { return "http://192.168.1.16:8079/favourite-service/api/v1"; }

    public static get BOOK_API_SEARCH(): string { return "http://openlibrary.org/search.json?q="; }

    public static get RECOMMENDATION_API_URL(): string { return "http://192.168.1.16:8079/recommendation-service/api/v1"; }

    
  //  public static get FAVOURITE_API_URL(): string { return "http://localhost:9400/api/v1"; }   
    /**
     *  public static get USER_SERVICE(): string { return "http://localhost:9300/api/v1/auth"; }
    public static get BOOK_API(): string { return "https://openlibrary.org/subjects/time:20th_century.json?limit=20"; }

    // public static get BOOK_API(): string { return "https://openlibrary.org/subjects/space_flight.json?limit=20&offset=1"; }

     

    public static get BOOK_API_SEARCH(): string { return "http://openlibrary.org/search.json?q="; }

    public static get RECOMMENDATION_API_URL(): string { return "http://localhost:9500/api/v1"; }
     */
    
}