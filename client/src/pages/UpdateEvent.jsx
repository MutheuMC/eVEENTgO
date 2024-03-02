import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateEvent() {
    const {id} = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    attendees: 0,
    ticketPrice: 0,
    image: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/event/${id}/update`).then((response) => {
        const event = response.data;
        setFormData({
          title: event.title,
          description: event.description,
          organizedBy: event.organizedBy,
          eventDate: event.eventDate,
          eventTime: event.eventTime,
          location: event.location,
          attendees: event.attendees,
          ticketPrice: event.ticketPrice,
          image: event.image,
        });
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios
        .put(`/event/${id}/update`, formData)
        .then((response) => {
          alert("Event updated successfully:", response.data);
          window.location.href = `/event/${id}`;
        })
        .catch((error) => {
          console.error("Error updating event:", error);
        });
    
    }
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Update an Event</h1></div>
      
      <form onSubmit={handleSubmit} className='flex flex-co'>
      <div className='flex flex-col gap-5'>
        <label className='flex flex-col'>
          Title:
          <input
            type="text"
            name="title"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Description:
          <textarea
            name="description"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Organized By:
          <input
            type="text"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="organizedBy"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Date:
          <input
            type="date"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Time:
          <input
            type="time"
            name="eventTime"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Location:
          <input
            type="text"
            name="location"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Number of attendees:
          <input
            type="number"
            name="attendees"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.attendees}
            onChange={handleChange}
          />
        </label>

        <label className='flex flex-col'>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>
        <button className='primary' type="submit">Update</button>
        </div>
        
      </form>
    </div>
  );
}
