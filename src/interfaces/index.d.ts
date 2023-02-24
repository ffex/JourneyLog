export interface IJourney{
    id:string;
    name:string;
    description?:string;
    numberTravellers:number;
    complete:boolean;
    fromVehicleId:string;
    toVehicleId:string;
    defaultVehicleId:string;
    fromDate:Date;
    toDate:Date;

}
export interface IVehicle{
    id:string;
    name:string;
    icon:string;

}

export interface IStop{
    id?:string;
    name:string;
    sequence:number;
    fromDate?:Date;
    toDate?:Date;
    numberNights?:number;
    location:string;
    complete?:boolean;
    reservation?:boolean;
    journeyId:string;
    /* NOT IN DB */
    place:google.maps.places.PlaceResult;
}
export interface IRoute{
    id?:string;
    fromStopId:string; 
    toStopId:string; 
    vehicleId:string;
    km:string;
    time:string;
    journeyId:string;
}
export interface ITodo{
    id:string;
    description:string;
    complete:boolean;
    journeyId:string;
}

type DataType = {
    title: string;
};
type OptionType = {
    label:string,
    customOption?: string,
}