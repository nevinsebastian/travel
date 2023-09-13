'use client'

import Container from "../Container";
import {MdKayaking,MdOutlineSurfing,MdHouseboat} from 'react-icons/md'
import {GiSpeedBoat} from 'react-icons/gi'
import {LuSailboat} from 'react-icons/lu'
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
    label:'Kayaking',
    icon:MdKayaking,
    description:"Kayaking activitys"
},
{
    label:'Houseboats',
    icon:MdHouseboat,
    discription:"House boat activitys"
},
{
    label:"Surfing",
    icon:MdOutlineSurfing,
    discription:"Surfing activitys"
},
{
    label:"Boating",
    icon:LuSailboat,
    discription:"Boating activitys"
},
{
    label:"Speed boat",
    icon:GiSpeedBoat,
    discription:"Speedboad activitys"
}

]


const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage){
        return null;
    }


    return ( 
        <Container>
            <div 
            className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto">
                {categories.map((item) => (
                    <CategoryBox 
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}

                    />
                ))}
            </div>
        </Container>
     );
}
 
export default Categories;