// app/guestbook/page.jsx - SERVER COMPONENT

export const metadata = {
  title: "Guestbook",
  description: "Leave a message on my digital wall! An interactive space where visitors can share thoughts, ideas, and connect with me.",
  keywords: "guestbook, contact, message, interactive, digital wall, connect",
  openGraph: {
    title: "Guestbook | Mohammed Naeem Ahmed",
    description: "Leave a message on my digital wall! An interactive space for visitors to connect.",
    url: "https://naeemcodes.com/guestbook",
  }
};

import GuestbookClient from './GuestbookClient';

export default function GuestbookPage() {
  return <GuestbookClient />;
}