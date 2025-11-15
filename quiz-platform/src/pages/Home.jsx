import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();

  // Updated card data with image URLs and colors for the text
  const cardData = [
    { 
      title: 'Create New Quiz', 
      to: '/create',
      color: 'white', // Text color for contrast
      // Placeholder image link:  with the actual image for 'Create New Quiz'
      imageUrl: 'https://www.sporcle.com/images/promo/promo-create-quiz.png' 
    },
    { 
      title: 'My Quizzes', 
      to: '/my',
      color: 'white',
      // Placeholder image link:  with the actual image for 'My Quizzes'
      imageUrl: 'https://336118.selcdn.ru/Gutsy-Culebra/products/myQuiz-Logo.png' 
    },
    { 
      title: 'Play Quiz', 
      to: '/play',
      color: 'white',
      // Placeholder image link:  with the actual image for 'Play Quiz'
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1Miy6W-VnKcxCa5dE4GueB7d7C9VtoADJZeyd-4CnI9P_chLxX8z2x7AMoIl6afWp0rg&usqp=CAU' 
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={4} justifyContent="center">
        {cardData.map(card => (
          <Grid item xs={12} sm={6} md={4} key={card.title}>
            <Card sx={{ height: 200, borderRadius: 3, boxShadow: 6 }}>
              <CardActionArea 
                onClick={() => {
                  if (['/create','/my'].includes(card.to)) {
                    nav('/admin-login', { state: { from: card.to } });
                  } else {
                    nav(card.to);
                  }
                }}
                sx={{ height: '100%' }}
              >
                <CardContent 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: 2,
                    // Styling for the image background
                    backgroundImage: `url(${card.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    // Adding an overlay for better text readability
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
                      borderRadius: 'inherit',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1, color: card.color }}>
                    <Typography variant='h5' component='div' fontWeight='bold'>
                      {card.title}
                    </Typography>
                    <Typography variant='body2' sx={{ mt: 1 }}>
                      Click to open
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}