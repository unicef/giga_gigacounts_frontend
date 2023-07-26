import { Helmet } from 'react-helmet-async'

export default function Page403() {
  return (
    <>
      <Helmet>
        <title> 403 Forbidden | Gigacounts</title>
      </Helmet>
      403
      {/* <m.div>
        <m.div variants={varBounce().in}>
          <Typography as="h3">No permission</Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography variant="textSecondary">
            The page you&apos;re trying access has restricted access.
            <br />
            Please refer to your system administrator
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Link to="/">Go to Home</Link>
      </m.div> */}
    </>
  )
}
