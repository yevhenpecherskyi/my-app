import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createUser, getToken, getUsers } from './api/api.ts';
import { Loader } from './Loader.tsx';

type Props = {
  page: number;
  setPage: (total: number) => void;
  setUsers: (users: User[]) => void;
};

export const NewUserForm: React.FC<Props> = ({
  page, setPage, setUsers,
}) => {
  const [photo, setPhoto] = useState<File>();
  const [position, setPosition] = useState('');
  const [token, setTok] = useState('');
  const [position_id, setId] = useState(0);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getToken().then(response => setTok(response.token));
  }, []);


  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    setLoaded(true);
    const { email, name, phone } = data;
    const formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('photo', photo);
    formData.append('position_id', position_id);
    createUser(formData, token, () => {
      getUsers(1).then(res => {
        setUsers(res.users);
        console.log('new users', res.users);
      });
    });
    reset();
    setSuccess(!success);
    setLoaded(false);
    setPage(1);
  };

  return (
    loaded ? <Loader /> : (
      <>
        <h1 className="title" id="signup">
          {success ? 'User successfully registered' : 'Working with POST request'}
        </h1>
        {loaded && <Loader />}
        {success
          ? (
            <div className="success"></div>
          )
          : (
            <form
              className="form"
              id="signup1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form__field">
                <input
                  type="text"
                  name="name"
                  {...register('name', {
                    required: 'Incorrect name',
                    minLength: {
                      value: 2,
                      message: 'Min length is 2'
                    }
                  })}
                  placeholder="Your name"
                  className={`form__input ${errors?.name && 'error'}`}
                />

                {errors?.name && (
                  <div className="error-message">
                    {errors?.name?.message}
                  </div>
                )}
              </div>

              <div className="form__field">
                <input
                  type="email"
                  name="email"
                  {...register('email', {
                    required: 'Incorrect email',
                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]\./
                  })}
                  placeholder="Your email"
                  className={`form__input ${errors?.email && 'error'}`}
                />

                  {errors?.email && (
                    <div className="error-message">
                      {errors?.email?.message}
                    </div>
                  )}
              </div>

              <div className="form__field">
                <input
                  name="phone"
                  {...register('phone', {
                    required: 'Incorrect phone number',
                    pattern: /\+380([0-9]{9})$/
                  })}
                  type="tel"
                  placeholder="Phone"
                  className={`form__input ${errors?.phone && 'error'}`}
                  />

                  {!errors?.phone && (
                    <div className="error-message__not">
                      +38 (XXX) XXX - XX - XX
                    </div>
                  )}

                  {errors?.phone && (
                    <div className="error-message">
                      {errors?.phone?.message}
                    </div>
                  )}
              </div>

              <div className="form__radio radio">
                <p>Select your position</p>

                <div className="radio__position">
                  <label>
                    <input
                      type="radio"
                      value="Lawyer"
                      id="1"
                      checked={position === "Lawyer"}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setId(+e.target.id);
                      }}
                    />
                    Lawyer
                  </label>
                </div>

                <div className="radio__position">
                  <label>
                    <input
                      type="radio"
                      value="Content manager"
                      id="2"
                      checked={position === "Content manager"}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setId(+e.target.id);
                      }}
                    />
                    Content manager
                  </label>
                </div>

                <div className="radio__position">
                  <label>
                    <input
                      type="radio"
                      value="Security"
                      id="3"
                      checked={position === "Security"}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setId(+e.target.id);
                      }}
                    />
                    Security
                  </label>
                </div>

                <div className="radio__position">
                  <label>
                    <input
                      type="radio"
                      value="Designer"
                      id="4"
                      checked={position === "Designer"}
                      onChange={(e) => {
                        setPosition(e.target.value);
                        setId(+e.target.id);
                      }}
                    />
                    Designer
                  </label>
                </div>
              </div>

              <div className="uploader">
                <label>
                  <div className="uploader__file-button">
                    Upload
                  </div>
                  <input
                    type="file"
                    id="file"
                    accept="image/jpg, image/jpeg"
                    className="uploader__inputfile"
                    onChange = {(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                  />

                  <input
                    type="text"
                    value={photo}
                    placeholder="Upload your photo"
                    className="uploader__input"
                  />

                </label>
              </div>

              <button
                type="submit"
                className={`form__submit-button button ${!isValid && 'disabled'}`}
                disabled={!isValid}
              >
                Sign up
              </button>
            </form>
          )}
      </>
    )
  );
};
