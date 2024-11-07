import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from  '../store/store'
import styles from '../styles/Username.module.css';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom'

export default function Recovery() {

  const { username } = useAuthStore(state => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      console.log(OTP)
      if(OTP) return toast.success('OTP ha sido enviado a tu correo electrónico!');
      return toast.error('Problema al generar OTP!')
    })
  }, [username]);

  async function onSubmit(e){
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code : OTP })
      if(status === 201){
        toast.success('Verificar con éxito!')
        return navigate('/reset')
      }  
    } catch (error) {
      return toast.error('¡OTP incorrecta! Revisa el correo electrónico nuevamente!')
    }
  }

  // handler of resend OTP
  function resendOTP(){

    let sentPromise = generateOTP(username);

    toast.promise(sentPromise ,
      {
        loading: 'Enviando...',
        success: <b>OTP ha sido enviada a su correo electrónico!</b>,
        error: <b>No se pudo enviar!</b>,
      }
    );

    sentPromise.then((OTP) => {
      console.log(OTP)
    });
    
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recuperar</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                Digite OTP para recuperar clave.
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>

              <div className="textbox flex flex-col items-center gap-6">

                  <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Digite los 6 digitos OTP ha enviado a su dirección de correo electrónico.
                    </span>
                    <input onChange={(e) => setOTP(e.target.value) } className={styles.textbox} type="text" placeholder='OTP' />
                  </div>

                  <button className={styles.btn} type='submit'>Recuperar</button>
              </div>
          </form>

          <div className="text-center py-4">
            <span className='text-gray-500'>No puedo obtener  OTP? <button onClick={resendOTP} className='text-red-500'>Reenviar</button></span>
          </div>

        </div>
      </div>
    </div>
  )
}
