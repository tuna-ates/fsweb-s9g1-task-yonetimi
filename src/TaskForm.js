import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { nanoid } from "nanoid";
import * as Yup from "yup";

const formSemasi = Yup.object().shape({
  title: Yup.string()
    .required("Task başlığı yazmalısınız")
    .min(3, "Task başlığı en az 3 karakter olmalı"),
  description: Yup.string()
    .required("Task açıklaması yazmalısınız")
    .min(10, "Task açıklaması en az 10 karakter olmalı"),
  people: Yup.array()
    .max(3, "En fazla 3 kişi seçebilirsiniz")
    .min(1, "Lütfen en az bir kişi seçin"),
});

const TaskForm = ({ kisiler, submitFn }) => {
  const {register,handleSubmit,formState:{errors,isValid}}=useForm({
    defaultValues:{
      title: "",
      description: "",
      people: "",
    },
    mode:"all"
  })
  // yup error stateleri

  // form datası her güncellendiğinde valid mi diye kontrol et


  // yup form alani her değiştiğinde çalışan kontrol fonksiyonu
 

  // checkboxların değişimini state içerisine eklemek için özel fonksiyon
  


  // diğer form alanları değiştikçe çalışan ve yeni değeri state'e ekleyen fonksiyon


  // task ekleme
  function onSubmit(formData) {
    console.log("data",formData);
    submitFn({...formData,id:nanoid(5),status:"yapılacak"});
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title",{required:"İsim alanı boş bırakılamaz!"})}
        />
        <div className="feedback-control">{errors?.title?.message}</div>
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description",{required:"Açıklama alanı boş bırakılamaz!",minLength:{value:10,message:"Açıklamayı en az 10 kelime ile anlat"}})}
        ></textarea>
         <div className="feedback-control">{errors?.description?.message}</div>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
               {...register("people",{required:"En az bir görevli seçmelisin!"})}
              />
              {p}
            </label>
          ))}
        </div>
        <div className="feedback-control">{errors?.people?.message}</div>
      </div>

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
