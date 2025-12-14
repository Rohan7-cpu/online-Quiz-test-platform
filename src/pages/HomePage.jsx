import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <div className="p-4 mt-12"> {/* Tailwind padding + margin-top */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea onClick={() => nav('/create')}>
              <CardContent>
                <img
                  src="https://images.ctfassets.net/rvt0uslu5yqp/4zVG1eCQtjAIsLCl2mNa2e/e58a8586b81347a387db31417bc86020/Blog_Quiz_Cover-01.png?w=540&q=60"
                  style={{ height: '186px' }}
                  className="w-full object-cover"
                />
                <Typography variant="h6"><strong>New Quiz</strong></Typography>
                <Typography variant="body2">Create MCQ questions</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea onClick={() => nav('/my-quizzes')}>
              <CardContent>
                <img
                  src="https://cdn-1.webcatalog.io/catalog/myquiz/myquiz-icon-filled-256.png?v=1714782112986"
                  style={{ height: '186px' }}
                  className=" w-full object-cover"
                />
                <Typography variant="h6"><strong>Quizzes</strong></Typography>
                <Typography variant="body2">View and edit saved questions</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardActionArea onClick={() => nav('/play')}>
              <CardContent>
                <img
                  src="https://akm-img-a-in.tosshub.com/app/at-app/app_config_imp/gamelist/game_thumbnail/horizontal/Quiz_AajTak_960_540%20Banner.png"
                  style={{ height: '186px' }}
                  className="w-full object-cover"
                />
                <Typography variant="h6"><strong>Play Quiz</strong></Typography>
                <Typography variant="body2">Take the quiz</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

