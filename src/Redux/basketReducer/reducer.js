import { BASKET_FAILURE, BASKET_REQUEST, GET_BASKET_SUCCESS } from "../actionTypes"

const ipoData = [
    {
      _id: "1",
      IPOName: "TechVision Ltd",
      IssueNumber: 101,
      IPOType: "Public",
      IssueSize: 500000000,
      FaceValue: 10,
      LostSize: 200,
      MinLotSize: 100,
      MaxLotSize: 500,
      LowerPrice: 90,
      HigherPrice: 100,
      CutOffRate: 95,
      PreDate: 20240110,
      StartDate: "2024-01-15",
      EndDate: "2024-01-20",
      AllocationDate: "2024-01-25",
      ListingDate: "2024-01-30",
      CreatedAt: "2024-01-05",
      IsActive: true
    },
    {
      _id: "2",
      IPOName: "EcoGreen Energy",
      IssueNumber: 102,
      IPOType: "Public",
      IssueSize: 750000000,
      FaceValue: 5,
      LostSize: 300,
      MinLotSize: 150,
      MaxLotSize: 600,
      LowerPrice: 80,
      HigherPrice: 90,
      CutOffRate: 85,
      PreDate: 20240111,
      StartDate: "2024-01-16",
      EndDate: "2024-01-21",
      AllocationDate: "2024-01-26",
      ListingDate: "2024-01-31",
      CreatedAt: "2024-01-06",
      IsActive: true
    },
    {
      _id: "3",
      IPOName: "FutureTech Innovations",
      IssueNumber: 103,
      IPOType: "Public",
      IssueSize: 600000000,
      FaceValue: 10,
      LostSize: 250,
      MinLotSize: 125,
      MaxLotSize: 500,
      LowerPrice: 95,
      HigherPrice: 105,
      CutOffRate: 100,
      PreDate: 20240112,
      StartDate: "2024-01-17",
      EndDate: "2024-01-22",
      AllocationDate: "2024-01-27",
      ListingDate: "2024-02-01",
      CreatedAt: "2024-01-07",
      IsActive: false
    },
    {
      _id: "4",
      IPOName: "GreenFarm Foods",
      IssueNumber: 104,
      IPOType: "Public",
      IssueSize: 450000000,
      FaceValue: 5,
      LostSize: 150,
      MinLotSize: 75,
      MaxLotSize: 400,
      LowerPrice: 70,
      HigherPrice: 80,
      CutOffRate: 75,
      PreDate: 20240113,
      StartDate: "2024-01-18",
      EndDate: "2024-01-23",
      AllocationDate: "2024-01-28",
      ListingDate: "2024-02-02",
      CreatedAt: "2024-01-08",
      IsActive: true
    },
    {
      _id: "5",
      IPOName: "SmartBuild Ltd",
      IssueNumber: 105,
      IPOType: "Public",
      IssueSize: 550000000,
      FaceValue: 10,
      LostSize: 300,
      MinLotSize: 100,
      MaxLotSize: 600,
      LowerPrice: 85,
      HigherPrice: 95,
      CutOffRate: 90,
      PreDate: 20240114,
      StartDate: "2024-01-19",
      EndDate: "2024-01-24",
      AllocationDate: "2024-01-29",
      ListingDate: "2024-02-03",
      CreatedAt: "2024-01-09",
      IsActive: true
    },
    {
      _id: "6",
      IPOName: "AquaPure Inc",
      IssueNumber: 106,
      IPOType: "Public",
      IssueSize: 700000000,
      FaceValue: 5,
      LostSize: 200,
      MinLotSize: 150,
      MaxLotSize: 700,
      LowerPrice: 75,
      HigherPrice: 85,
      CutOffRate: 80,
      PreDate: 20240115,
      StartDate: "2024-01-20",
      EndDate: "2024-01-25",
      AllocationDate: "2024-01-30",
      ListingDate: "2024-02-04",
      CreatedAt: "2024-01-10",
      IsActive: false
    },
    {
      _id: "7",
      IPOName: "Innova Pharmaceuticals",
      IssueNumber: 107,
      IPOType: "Public",
      IssueSize: 800000000,
      FaceValue: 10,
      LostSize: 350,
      MinLotSize: 200,
      MaxLotSize: 800,
      LowerPrice: 100,
      HigherPrice: 110,
      CutOffRate: 105,
      PreDate: 20240116,
      StartDate: "2024-01-21",
      EndDate: "2024-01-26",
      AllocationDate: "2024-01-31",
      ListingDate: "2024-02-05",
      CreatedAt: "2024-01-11",
      IsActive: true
    },
    {
      _id: "8",
      IPOName: "NextWave Telecom",
      IssueNumber: 108,
      IPOType: "Public",
      IssueSize: 900000000,
      FaceValue: 5,
      LostSize: 400,
      MinLotSize: 200,
      MaxLotSize: 800,
      LowerPrice: 110,
      HigherPrice: 120,
      CutOffRate: 115,
      PreDate: 20240117,
      StartDate: "2024-01-22",
      EndDate: "2024-01-27",
      AllocationDate: "2024-02-01",
      ListingDate: "2024-02-06",
      CreatedAt: "2024-01-12",
      IsActive: true
    },
    {
      _id: "9",
      IPOName: "ClearSky Technologies",
      IssueNumber: 109,
      IPOType: "Public",
      IssueSize: 400000000,
      FaceValue: 10,
      LostSize: 200,
      MinLotSize: 150,
      MaxLotSize: 500,
      LowerPrice: 95,
      HigherPrice: 105,
      CutOffRate: 100,
      PreDate: 20240118,
      StartDate: "2024-01-23",
      EndDate: "2024-01-28",
      AllocationDate: "2024-02-02",
      ListingDate: "2024-02-07",
      CreatedAt: "2024-01-13",
      IsActive: false
    },
    {
      _id: "10",
      IPOName: "Solar Solutions",
      IssueNumber: 110,
      IPOType: "Public",
      IssueSize: 850000000,
      FaceValue: 10,
      LostSize: 500,
      MinLotSize: 250,
      MaxLotSize: 1000,
      LowerPrice: 120,
      HigherPrice: 130,
      CutOffRate: 125,
      PreDate: 20240119,
      StartDate: "2024-01-24",
      EndDate: "2024-01-29",
      AllocationDate: "2024-02-03",
      ListingDate: "2024-02-08",
      CreatedAt: "2024-01-14",
      IsActive: true
    }
  ];
  
const initialState ={
    baskets :[],
    isLoading:false,
    isError:false,
    error:""
}


export const reducer =(state =initialState,action) =>{
    switch(action.type) {
        case BASKET_REQUEST:
            return  {...state, isLoading:true}
        case BASKET_FAILURE : 
        return {
            ...state,
            isLoading:false, 
            isError :true,
            error:action.payload,
        }
        case GET_BASKET_SUCCESS :
            return {
                ...state,
                isLoading:false,
                isError:false,
                baskets:action.payload
            }
        default :
            return state
        
    }
}