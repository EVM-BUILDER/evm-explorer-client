import Link from 'next/link'

const NextLink = ({ className, href, children, onClick, ...props }) => {
  const isHttp = href?.startsWith('http')
  if (href && isHttp) {
    return (
      <a className={className} href={href} rel="noreferrer" onClick={onClick} {...props}>
        {children}
      </a>
    )
  }
  if (!href) {
    return (
      <a className={className} onClick={onClick} {...props}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href} {...props}>
      <a className={className} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
}

NextLink.defaultProps = {
  className: '',
}

export default NextLink
