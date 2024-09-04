'use client';

import {useFormStatus} from "react-dom";

type SubmitButtonProps = {
    label: string;
    loading: React.ReactNode;
};

const SubmitButton = ({ label, loading }: SubmitButtonProps) => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} type="submit" className="className='p-2 bg-amber-500 w-full mt-4'">
            {pending ? loading : label}
        </button>
    );
};

export default SubmitButton