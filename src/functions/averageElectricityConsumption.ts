import { calculElectricInfo } from "./calcul_electric_info";

export function averageElectricityConsumption(data:number[]){
    return (calculElectricInfo(data) / 30.4167).toPrecision(3) // moyenne de jour dans un mois
}