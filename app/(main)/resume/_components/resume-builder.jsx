'use client'
import { Button } from '@/components/ui/button'
import { Download, Save } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resumeSchema } from '@/app/lib/schema';
import useFetch from '@/hook/use-fetch';
import { saveResume } from '@/actions/resume';

const ResumeBuilder = ({ initialContent }) => {

    const [activeTab, setActiveTab] = useState("edit");

    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } =
        useForm({
            resolver: zodResolver(resumeSchema),
            defaultValues: {
                contactInfo: {},
                summary: "",
                skills: "",
                experience: [],
                education: [],
                projects: [],
            },
        });

    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError,
    } = useFetch(saveResume);

    const formValues = watch();

    useEffect(() => {
        if (initialContent) {
            setActiveTab("preview");
        }
    }, [initialContent]);

    return (
        <div data-color-mode="light" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                <h1 className='font-bold gradient-title text-5xl md:text-6xl'>Resume Builder</h1>

                <div className='space-x-2'>
                    <Button className='bg-green-600 text-white hover:bg-green-800'>
                        <Save className='h-4 w-4' />
                        Save
                    </Button>
                    <Button>
                        <Download className='h-4 w-4' />
                        Download PDF
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Contact Information</h3>
                            <div>
                                
                            </div>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="preview">Change your password here.</TabsContent>
            </Tabs>


        </div>
    )
}

export default ResumeBuilder