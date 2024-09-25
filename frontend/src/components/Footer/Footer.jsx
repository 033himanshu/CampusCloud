import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <section className="relative p-2 bg-[#13293D]">
            <div className="max-w-7xl">
                <div className="flex flex-wrap">
                    <div className="w-full">
                        <div className="flex h-full justify-between items-center">
                            <div className="inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <div>
                                <p className="text-sm text-white">
                                    &copy; Copyright 2024. All Rights Reserved by <a href='https://github.com/033himanshu' target="_blank" className='underline font-bold'>Campus-Cloud</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer