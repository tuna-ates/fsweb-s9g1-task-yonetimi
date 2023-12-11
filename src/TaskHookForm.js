import { nanoid } from 'nanoid';
import React from 'react'
import { useForm, SubmitHandler,Controller } from "react-hook-form"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function TaskHookForm(props) {
  const {kisiler,submitFn}=props;
  const {register,handleSubmit,formState:{errors,isValid}}=useForm({
    defaultValues:{
      title:"",
      description:"",
      people:false
    },
    mode:"all"
  })
  const onSubmit=(formData)=>{
    console.log("data:",formData);
    submitFn({...formData,id:nanoid(5),status:"yapılacak"})
   
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
    <div className="form-line">
      <label className="input-label" htmlFor="title">
        Başlık
      </label>
      <input
        className="input-text " 
        id="title"
        type="text"
        {...register("title",{required:"Task başlığı yazmalısınız",minLength:{value:3,message:"Task başlığı en az 3 karakter olmalı"}})}
      />
      <div className="valid-feedback">{errors?.title?.message}</div>
    </div>

    <div className="form-line">
      <label className="input-label" htmlFor="description">
        Açıklama
      </label>
      <textarea
        className="input-textarea"
        rows="3"
        id="description"
        {...register("description",{required:"Task açıklaması yazmalısınız",minLength:{value:10,message:"Task açıklaması en az 10 karakter olmalı"}})}
      ></textarea>
       <div className="valid-feedback">{errors?.description?.message}</div>
    </div>

    <div className="form-line">
      <label className="input-label">İnsanlar</label>
      <div>
        {kisiler.map((p) => (
          <label className="input-checkbox" key={p}>
            <input
              type="checkbox"
      
             {...register("people",{ required:true})}
            />
            {p}
          </label>
        ))}
      </div>
      <div className="valid-feedback">{errors?.people?.message}</div>
    </div>

    <div className="form-line">
      <button
        className="submit-button"
        type="submit"
      
      >
        Kaydet
      </button>
    </div>
  </form>
);
  
}
