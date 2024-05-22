import { useState } from 'react';
import { useForm } from 'react-hook-form';

const UpdateProfileForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store image URL

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);

    if (imageFile) {
      formData.append('photo', imageFile);
    }

    try {
      const response = await fetch('https://alireza7222.pythonanywhere.com/api/v1/accounts/complete_profile/', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access-token')}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const responseData = await response.json();
      console.log('Profile update successful:', responseData);

      // Handle successful update (e.g., display success message)
    } catch (error) {
      console.error('Profile update error:', error);

      // Handle update error (e.g., display error message)
    }
  };

  const handleImageChange = (event: any) => {
    event.preventDefault();

    const file = event.target.files[0];
    setImageFile(file);

    // Preview image if desired
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setImageUrl(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <span className="error">First name is required</span>}
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" {...register('lastName', { required: true })} />
        {errors.lastName && <span className="error">Last name is required</span>}
      </div>
      <div>
        <label htmlFor="photo">Profile Photo:</label>
        <input type="file" id="photo" onChange={handleImageChange} />
        {imageUrl && <img src={imageUrl} alt="Preview" />}
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;