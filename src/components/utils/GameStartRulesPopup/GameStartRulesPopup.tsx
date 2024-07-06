'use client'
import React, { useEffect, useRef } from 'react'
import Link from 'next/link'

type Props = {}

const GameStartRulesPopup: React.FC<Props> = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const handleOutsideClick = () => {
    dialogRef.current?.close();
  }

  useEffect(() => {
    if (dialogRef) {
      dialogRef.current?.show();
    }
  })

  return (
    <>
      <span
        className='w-screen h-screen fixed top-0 left-0'
        onClick={handleOutsideClick}
      ></span>
      <dialog ref={dialogRef} className='w-[743px] h-[388px] m-auto rounded-[10px] box-border border-2 border-main-font-color'>
        <div className='h-[52px] mb-7 bg-main-yellow rounded-[10px] flex justify-center items-center shadow-3xl'>
          <p className='text-[2rem]'>
            00:00
          </p>
        </div>

        <ol className='w-[690px] mx-auto flex justify-start flex-col gap-2 text-xl'>
          <li className='list-decimal list-inside text-start'>
						Створіть&nbsp;
            <Link href='https://meet.google.com/' target='_blank' className='text-main-yellow hover:text-orange'>
              Google Meet
            </Link>
            &nbsp;та вcтавте посилання у відповідне вікно на вверхній панелі поля гри
          </li>

          <li className='list-decimal list-inside text-start'>
						Назвіть свою команду
					</li>

          <li className='list-decimal list-inside text-start'>
						Визначте послідовність учасників
					</li>

          <li className='list-decimal list-inside text-start'>
						Визначте, хто записує історію та презентує команду
					</li>

          <li className='list-decimal list-inside text-start'>
						Під час ходу дотримуйтеся таймінгу
					</li>
        </ol>
      </dialog>
    </>
  )
}

export default GameStartRulesPopup;
