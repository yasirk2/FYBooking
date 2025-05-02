const StartPage = () => {
  return (
    <>
      <h1>FYBooking</h1>
      <form>
        <label htmlFor="name">Användarnamn</label>
        <input type="text" name="name"/>
        <label htmlFor="password">Lösenord</label>
        <input type="password" name="password" />
        <button type="submit">Logga In</button>
      </form>
    </>
  );
};

export default StartPage;