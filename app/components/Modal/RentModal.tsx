'use client';


import { useMemo, useState } from "react";
import Modal from "./Modal";

import useRentModal from '@/app/hooks/useRentModal';
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "@/app/inputs/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import CountrySelect from "@/app/inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "@/app/inputs/Counter";
import ImageUpload from "@/app/inputs/ImageUpload";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGE = 3,
    DESCRIPTION = 4,
    PRICE = 5
}


const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState:{
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues:{
            categories:'',
            location:'',
            guestCount:'',
            propsCount:'',
            imageSrc:'',
            price:1,
            title:'',
            description:''
        }
    });
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const propsCount = watch('propsCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'),{
        ssr : false
    }),[location]);

    const setCustomValue = (id: string, value: any) =>{
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value -1);
    };

    const onNext = () => {
        setStep((value) => value +1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
          return 'Create'
        }
    
        return 'Next'
      }, [step]);
    
      const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
          return undefined
        }
    
        return 'Back'
      }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
            title="Which of these best describes you activity"
            subtitle="Pick a category"
            />
            <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-y-auto
            "
            >
                {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
              />
                    </div>
                ))}
            </div>
        </div>
    );
    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                title="where is your place loactaed?"
                subtitle="Help guests find you!"
                />
                <CountrySelect
                value={location}
                onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                center={location?.latlng}
                />
            </div>
        )
    }


    if (step === STEPS.INFO) {
        bodyContent =(
            <div className="flex flex-col gap-8">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have"
                />
                <Counter 
                title="Guests"
                subtitle="how many guests do you allow?"
                value={guestCount}
                onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                 <Counter 
                title="Number of props"
                subtitle="how many props do you have?"
                value={propsCount}
                onChange={(value) => setCustomValue('propsCount', value)}
                />
                
            </div>
        )
    }

    if (step === STEPS.IMAGE){
        bodyContent= (
            <div className="flex flex-col gap-8">
                <Heading
                title="Add a photo of your activity"
                subtitle="show guests what your activity looks like!"
                />
                <ImageUpload 
                value={imageSrc}
                onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
        )
    }
    
    return ( 
        <Modal
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={onNext}
        title="List your Activity"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel} 
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
        />
     );
}
 
export default RentModal;