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
    public numberOfTrips: numberOfTrips[] | undefined;
}

export class numberOfTrips {

    public JourneyDate: Date | undefined;
    public AvailableSeats: string | undefined;

}

export class busTicket {
    public _id: String | undefined;
    public busId: String | undefined;
    public bookedBy: String | undefined;
    public busName: string | undefined;
    public bookedDate: Date | undefined;
    public startCity: string | undefined;
    public destinationCity: string | undefined;
    public fairPaid: string | undefined;
    public contactNo: string | undefined;
    public aadharNo: string | undefined;
    public address: string | undefined;
    public isCancelled: boolean | undefined;
    public bordingTime: string | undefined;
    public passengers: passenger[] | undefined;
}

export class passenger {
    public ticketId: string | undefined;
    public name: string | undefined;
    public age: string | undefined;
    public gender: string | undefined;
    public seatNo: string | undefined;
}
