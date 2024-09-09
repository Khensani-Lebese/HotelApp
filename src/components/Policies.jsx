// src/components/Policies.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components
const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #333;
  color: #fff;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const BackButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  background: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  &:hover {
    background: #0056b3;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: 1rem;
  line-height: 1.6;
`;

const Policies = () => {
  return (
    <Container>
      <Navbar>
        <Logo>MyHotel</Logo>
        <BackButton to="/">Back to Landing Page</BackButton>
      </Navbar>
      <Section>
        <Title>General Policies</Title>
        <Paragraph>
          Welcome to our hotel! Please review our general policies to ensure a comfortable stay:
        </Paragraph>
        <Paragraph>
          - Check-in time is from 3:00 PM onwards. Early check-in is subject to availability and may incur additional charges.
        </Paragraph>
        <Paragraph>
          - Check-out time is by 11:00 AM. Late check-out may be available upon request and may incur additional charges.
        </Paragraph>
        <Paragraph>
          - A valid ID and credit card are required at check-in.
        </Paragraph>
      </Section>
      <Section>
        <Title>Cancellation Policy</Title>
        <Paragraph>
          Our cancellation policy is as follows:
        </Paragraph>
        <Paragraph>
          - Cancellations made 24 hours before the scheduled check-in time are free of charge.
        </Paragraph>
        <Paragraph>
          - Cancellations made within 24 hours of check-in will incur a one-night charge.
        </Paragraph>
        <Paragraph>
          - No-shows will be charged for the entire stay.
        </Paragraph>
      </Section>
      <Section>
        <Title>Payment Policy</Title>
        <Paragraph>
          Payment policies are outlined below:
        </Paragraph>
        <Paragraph>
          - All reservations require a credit card guarantee.
        </Paragraph>
        <Paragraph>
          - The total amount will be charged upon check-in.
        </Paragraph>
        <Paragraph>
          - We accept all major credit cards.
        </Paragraph>
      </Section>
      <Section>
        <Title>Smoking Policy</Title>
        <Paragraph>
          Our hotel is a non-smoking property. Smoking is only permitted in designated outdoor areas.
        </Paragraph>
        <Paragraph>
          - A cleaning fee will be applied if smoking is detected in the guest rooms.
        </Paragraph>
      </Section>
      <Section>
        <Title>Pet Policy</Title>
        <Paragraph>
          We welcome pets with the following conditions:
        </Paragraph>
        <Paragraph>
          - Pets are allowed in specific pet-friendly rooms only.
        </Paragraph>
        <Paragraph>
          - A non-refundable cleaning fee will be charged.
        </Paragraph>
        <Paragraph>
          - Pets must be accompanied by valid vaccination records.
        </Paragraph>
      </Section>
    </Container>
  );
};

export default Policies;
