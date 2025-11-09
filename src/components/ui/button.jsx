import React from 'react'
export function Button({ className='', children, variant='default', size='md', ...props }){
  const base='inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants={ default:'bg-indigo-600 text-white hover:bg-indigo-700', outline:'bg-transparent border-2 border-gray-300 text-gray-900 hover:bg-gray-50' }
  const sizes={ sm:'px-3 py-1.5 text-sm', md:'px-4 py-2', lg:'px-10 py-7 text-lg' }
  return <button className={[base,variants[variant]||variants.default,sizes[size]||sizes.md,className].join(' ')} {...props}>{children}</button>
}
export default Button
