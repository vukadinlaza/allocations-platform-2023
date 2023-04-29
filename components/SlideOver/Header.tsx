import { Grid } from '@mui/material';
Grid;
export default function SlideOverHeader({ content }: { content: any }) {
  return (
    <header>
      {content.name && <h1>{content.name}</h1>}
      <Grid container>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <p>Total Raised</p>
            <p>x</p>
          </Grid>
          <Grid item xs={6}>
            <p>Target Raise</p>
            <p>x</p>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          progress
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={6}>
            <p>Wire deadline</p>
            <p>x</p>
          </Grid>
          <Grid item xs={6}>
            <button className="btn primary">View Deal Page</button>
          </Grid>
        </Grid>
      </Grid>
    </header>
  );
}
