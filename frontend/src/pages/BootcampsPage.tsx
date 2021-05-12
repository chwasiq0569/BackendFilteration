import { Card, CircularProgress, Container, FormControl, FormControlLabel, Grid, makeStyles, Paper, Radio, RadioGroup, Slider, TextField, Typography } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './../components/Navbar';
import BootcampCard from './../components/BootcampCard';
import { useHistory, useLocation } from 'react-router';
const useStyles = makeStyles({
    root: {
        marginTop: 20
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paper: {
        marginBottom: "1rem",
        padding: "13px"
    },
    filters: {
        padding: "0 1.5rem"
    },
    pricingRangeInputs: {
        display: "flex",
        justifyContent: "space-between"
    }
})

export interface BootcampsPageProps {
    
}

interface dataType{
    description: string;
    name: string;
    price: number;
    rating: any;
    _id: string;
}

const BootcampsPage: React.FC<BootcampsPageProps> = () => {
    const history = useHistory();
    const location = useLocation();

    const params = location.search ? location.search : null;

    const [sliderMax, setSliderMax] = useState(1000)
    const [priceRange, setPriceRange] = useState([25, 75])
    const [loading, setLoading] = useState<boolean>(true);
    const [bootcamps, setBootcamps] = useState<dataType[] | null>(null);
    const [filter, setFilter] = useState("");
    const [priceOrder, setPriceOrder] = useState("descending");
    const [sorting, setSorting] = useState("");
    const classes = useStyles();


    const updateUIValues = (uiValues: any) => {
        setSliderMax(uiValues.maxPrice)
        if(uiValues.filtering.price){
            let priceFilter = uiValues.filtering.price
            setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)])
        }
        if(uiValues.sorting.price){
            let priceSort = uiValues.sorting.price
            setPriceOrder(priceSort)
        }
    }

    const onSliderCommitHandler = (e: any, newValue: any) => {
        buildRangeFilter(newValue)
    }

    const buildRangeFilter = (newValue: any) => {
        console.log("newValue", newValue)

        const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`
        setFilter(urlFilter)

        history.push(urlFilter)
    }

    useEffect(() => {

        let query: any;

        if(params && !filter){
            query = params
        }else{
            query = filter
        }

        if(sorting){
            if(query.length === 0){
                query = `?sort=${sorting}`
            }else{
                query = query + '&sort=' + sorting
            }
        }

        let cancel: any;
        const fetchData = async () => {
            setLoading(true)
            try{
                const { data } = await axios({
                    method: "GET",
                    url: `api/v1/bootcamps/${query}`,
                    cancelToken: new axios.CancelToken((c) => cancel = c)
                })
                console.log("data.data: ", data.data);
                setBootcamps(data.data)
                setLoading(false)
                updateUIValues(data.uiValues)
            }catch(error){
                if(axios.isCancel(error)) return
                console.log(error.response.data);
            }
        }
        fetchData();

        return () => cancel()

    }, [filter, params, sorting])
    console.log("bootcamps: ", bootcamps)

    const handleSortChange = (e: any) => {
        setPriceOrder(e.target.value)

        if(e.target.value === 'ascending'){
            setSorting("price")
        }else if(e.target.value === 'descending'){
            setSorting("-price")
        }

    }

    const handlePriceInputChange = (e: any, type: any) => {
        let newRange;
        if(type === "lower"){
            newRange = [...priceRange]
            newRange[0] = Number(e.target.value)
            setPriceRange(newRange)
        }
        if(type === "upper"){
            newRange = [...priceRange]
            newRange[1] = Number(e.target.value)
            setPriceRange(newRange)
        }
    }

    const onTextFieldCommitHandler = () => {
        buildRangeFilter(priceRange)
    }

    return ( <div className={classes.filters}>
        <Navbar />
        <Container className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                            <Typography gutterBottom>Filter</Typography>
                            <div>
                                <Slider
                                    min={0}
                                    max={sliderMax}
                                    value={priceRange}
                                    valueLabelDisplay={'auto'}
                                    onChange={(e: any, newValue: any) => setPriceRange(newValue)}
                                    onChangeCommitted={onSliderCommitHandler}
                               />
                                <TextField 
                                    size="small"
                                    id="lower"
                                    label="Min Price"
                                    variant="outlined"
                                    type="number"
                                    disabled={loading}
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceInputChange(e, "lower")}
                                    onBlur={onTextFieldCommitHandler}
                                />
                                <TextField 
                                    size="small"
                                    id="upper"
                                    label="Max Price"
                                    variant="outlined"
                                    type="number"
                                    disabled={loading}
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceInputChange(e, "upper")}
                                    onBlur={onTextFieldCommitHandler}
                                />
                            </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                            <Typography gutterBottom>
                                SortBy
                            </Typography>
                            <FormControl component="fieldset" className={classes.filters}>
                                <RadioGroup value={priceOrder} onChange={handleSortChange} aria-label="price-order" name="price-order">
                                    <FormControlLabel value="descending" disabled={loading} control={<Radio />} label="Price highest - Lowest"  />
                                    <FormControlLabel value="ascending" disabled={loading} control={<Radio />} label="Price Lowest - Highest"  />
                                </RadioGroup>
                            </FormControl>
                    </Grid>
                </Grid>
            </Paper>
         <Grid container spacing={2} style={{marginTop: "2rem"}}>
                {
                    loading ? (
                        <div className={classes.loader}>
                                <CircularProgress size="3rem" thickness={5} />
                        </div>
                    ) : (
                       bootcamps && bootcamps.map((bootcamp) => (
                            <Grid item md={4} key={bootcamp._id}>
                                <div>
                                    {
                                       <BootcampCard bootcamp={bootcamp} />
                                    }
                                </div>
                            </Grid>
                        ))
                    )
                }
         </Grid>
        </Container>
    </div> );
}
 
export default BootcampsPage;