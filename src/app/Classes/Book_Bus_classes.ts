export class login {
    public _id: String | undefined;
    public name: String | undefined;
    public emailId: string | undefined;
    public password: string | undefined;
    public dateOfBirth: Date | undefined;
    public role: string | undefined
}

export class searchBus {
    public startCity: String | undefined;
    public endCity: String | undefined;
    public journeyDate: Date | undefined;
}

export class addTrip {
    public _id: String | undefined;
    public adminEmail: String | undefined;
    public tripName: String | undefined;
    public startDate: Date | undefined;
    public endDate: Date | undefined;
    public startCity: String | undefined;
    public destinationCity: String | undefined;
    public fair: String | undefined;
    public noOfSeats: String | undefined;
    public isDeleted: boolean | undefined;
    public numberOfTrips : numberOfTrips[] | undefined;
}

export class numberOfTrips {

    public JourneyDate: Date | undefined;
    public AvailableSeats: string | undefined;

}
