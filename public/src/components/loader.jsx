import { CircularProgress, Typography } from "@mui/material" 

const style = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',  
    flexDirection: 'column',  
    zIndex: 1000
}

export const Loader = ({visible}) => {
    return (
        visible ? <div className="loader" style={style}>
            <CircularProgress />   
            <Typography variant="h5" sx={{color: '#0D4BC1', marginTop: 2}} >
                Loading...
            </Typography>
        </div> : ''
    )

}