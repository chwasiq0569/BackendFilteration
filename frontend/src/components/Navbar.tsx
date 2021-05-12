import { AppBar, Toolbar, Typography } from "@material-ui/core";

 
const Navbar: React.FC = () => {
    return ( <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5">
                        Bootcamps
                    </Typography>
                </Toolbar>
             </AppBar> );
}
 
export default Navbar;