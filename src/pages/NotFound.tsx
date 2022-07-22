import { Link } from 'react-router-dom'

const NotFound: React.FC = (): JSX.Element => {
  return (
    <div>
      <p style={{ textAlign: 'center' }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  )
}

export default NotFound
