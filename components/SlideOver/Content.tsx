import { LinearProgress } from '@mui/material';

export default function SlideOverContent({ data }: { data: any }) {
  console.log(data);
  const content = data.data;
  return (
    <div>
      {!data && !content && <h1>No information.</h1>}
      {data && content && (
        <div className="slideover">
          {content.name && <h1>{content.name}</h1>}
          <div>
            <LinearProgress
              variant="determinate"
              value={75}
              sx={{ height: '12px', }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
