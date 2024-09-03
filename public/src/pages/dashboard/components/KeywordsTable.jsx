import React, { useState } from 'react';
import {
    Checkbox,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
} from '@mui/material';
import TextSpliter from './TextSpliter';
import CheckedIcon from '../../../checkbox_icons/checked.png';
import UnCheckedIcon from '../../../checkbox_icons/unchecked.png';
import SortIcon from '../../../checkbox_icons/sort_icon.png';
import { useSelector } from 'react-redux';
const KeywordsTable = ({ keywords, onCheckboxChange, title, setKeywords }) => {
    const [sortDirection, setSortDirection] = useState(1);
    const filterText = useSelector((state) => state.filteringTextData);

    const sortKeywords = () => {
        const collator = new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base',
        });

        const sortedKeywords = [...keywords].sort((a, b) => {
            return sortDirection * collator.compare(a.label, b.label);
        });
        setSortDirection((e) => -e);
        // Assuming this updates the state of keywords correctly
        setKeywords(sortedKeywords);
    };

    const checkedKeyWordsLen = keywords?.filter((e) => e.isChecked).length;

    const filterKeywords = (keywords) => {
        let duplicated = [...keywords];

        if (filterText) {
            duplicated = duplicated.filter(
                (item) =>
                    item.label.toLowerCase().indexOf(filterText.toLowerCase()) >
                    -1
            );
        }

        return duplicated;
    };
   
    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: '2rem',
                tableContainer: {
                    boxShadow: 'none',
                },
            }}
        >
            <Table
                sx={{ minWidth: 450 }}
                aria-label='simple table'
            >
                <TableHead>
                    <TableRow>
                        <TableCell
                            colSpan={2}
                            sx={{
                                borderBottomWidth: 1, // Set the width of the bottom border
                                borderBottomStyle: 'solid', // Ensure it's a solid line
                            }}
                        >
                            <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >
                                <Typography
                                    variant='h5'
                                    color={'#7E8083'}
                                    sx={{ textAlign: 'center', width: '100%' }}
                                >
                                    {/* {`${checkedKeyWordsLen}/${keywords.length}`} &nbsp; {title} */}
                                    {`${filterKeywords(keywords).length}`}{' '}
                                    &nbsp; {title}
                                </Typography>
                                <IconButton
                                    onClick={sortKeywords}
                                    style={{
                                        transform: `rotate(${
                                            sortDirection === 1 ? 0 : 180
                                        }deg)`, // Rotate based on direct value
                                        transition:
                                            'transform 0.3s ease-in-out', // Add transition for smooth animation
                                    }}
                                >
                                    <img
                                        src={SortIcon}
                                        height={20}
                                        width={20}
                                        alt='Sort Icon'
                                    />
                                </IconButton>
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody  style={{
                    height: keywords.length > 30 ? 30 * 80.74 + 'px' : 'auto',  
                    overflowY: keywords.length > 30 ? 'scroll' : 'hidden',
                    display: 'block',
                }}>
                    {filterKeywords(keywords).map((keyword) => (
                        <TableRow
                            key={keyword.label}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell
                                component='th'
                                scope='row'
                                sx={{
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    width: '90%',
                                    position: 'relative', // Ensure relative positioning for the pseudo-element
                                    paddingRight: 0, // Remove default padding
                                }}
                            >
                                <TextSpliter
                                    title={title}
                                    text={keyword.label}
                                ></TextSpliter>
                            </TableCell>
                            <TableCell align='right' sx={{ width: '10%' }}>
                                <Checkbox
                                    icon={
                                        <img
                                            src={UnCheckedIcon}
                                            alt='unCheckedIcon'
                                            height={30}
                                            width={30}
                                        ></img>
                                    }
                                    checkedIcon={
                                        <img
                                            src={CheckedIcon}
                                            alt='checkedIcon'
                                            height={30}
                                            width={30}
                                        ></img>
                                    }
                                    checked={keyword.isChecked ?? false}
                                    onClick={() =>
                                        onCheckboxChange(keyword.label)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default KeywordsTable;
