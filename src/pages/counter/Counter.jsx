import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Box } from "@mui/system";

const TITLE_LIMIT = 70;
const DESCRIPTION_LIMIT = 170;
const TEXT_LIMIT = '-';
const SHADOW = '0px 10px 40px 2px rgba(0,0,0,0.05)';

const Counter = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [text, setText] = useState({value: '', count: 0});


    return  <Paper sx={{p: 5, borderRadius: '23px'}} elevation={0} square={false} > 
            <Typography  variant="h5" fontWeight={"bold"} sx={{pb: 10}} align="left">
                Text Counter
            </Typography>
            <Box sx={{mb: 10}}>
                <Paper sx={{p: 5, borderRadius: '23px', boxShadow: SHADOW}} square={false}   >
                    <Typography variant="h5" fontWeight={"bold"} sx={{pb: 1}} align="left">
                        Title
                    </Typography>
                    <TextField 
                        multiline
                        sx={{mb: 10, border: 'unset',
                            "textarea": {
                                minHeight: '1em', p: 1
                            }
                        }}
                        helperText={`${title.length} / ${TITLE_LIMIT}`}
                        FormHelperTextProps={{style: {marginLeft: 'auto'}}}
                        fullWidth error={title.length > TITLE_LIMIT} 
                        id="standard-basic" 
                        placeholder="Keywords" 
                        variant="standard" 
                        value={title} 
                        onChange={e => {
                            setTitle(e.target.value)   
                        }}/> 
                </Paper>
            </Box>

            
            <Box sx={{mb: 10}}>
                <Paper sx={{p: 5, borderRadius: '23px', boxShadow: SHADOW}} square={false}>
                    <Typography variant="h5" fontWeight={"bold"} sx={{pb: 1}} align="left">
                        Description
                    </Typography>
                    <TextField 
                        sx={{mb: 10, border: 'unset',
                            "textarea": {
                                minHeight: '1em', p: 1
                            }
                        }}
                        fullWidth 
                        multiline
                        error={description.length > DESCRIPTION_LIMIT}  
                        id="standard-basic" placeholder="Keywords" 
                        variant="standard"   value={description} 
                        onChange={e => {setDescription(e.target.value)}}
                        helperText={`${description.length} / ${DESCRIPTION_LIMIT}`} 
                        FormHelperTextProps={{style: {marginLeft: 'auto'}}}
                    /> 
                </Paper>
            </Box>

               
            <Box>
                <Paper sx={{p: 5, borderRadius: '23px', boxShadow: SHADOW}} square={false}>
                    <Typography variant="h5" fontWeight={"bold"} sx={{pb: 1}} align="left">
                        Text on page
                    </Typography>
                    <TextField 
                        sx={{mb: 10, border: 'unset',
                            "textarea": {
                                minHeight: '1em', p: 1
                            }
                        }}
                        multiline
                        FormHelperTextProps={{style: {marginLeft: 'auto'}}} 
                        helperText={`${text.count} / ${TEXT_LIMIT}`}
                        fullWidth id="standard-basic" 
                        placeholder="Keywords" 
                        variant="standard" 
                        value={text.value} 
                        onChange={e => {setText({value: e.target.value, count: countWords(e.target.value)})}} /> 
                </Paper>
            </Box>
        </Paper> 
}

export default Counter;

function countWords(str) { 
    const trimmedStr = str.split(/\s+/g);
  
    const res = trimmedStr.filter(x => {
        return x.length >= 1 && (/[a-zA-Z0-9]/g).test(x);
    })
  
    // Split the string by spaces to get an array of words and return its length
    return res.length;
  }