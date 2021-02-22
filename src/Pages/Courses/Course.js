import { useAuth } from "../../utils/auth";

function Course({ description, image, instructors, periods, title, enroll }) {
  const { user } = useAuth();

  const instructor = user ? user?.role === "Instructor" : false;
  const username = user?.name;

  return (
    <div className="course">
      <img className="courseImage" src={image} alt={"noimage"} />
      <h1 className="courseTitle">{title}</h1>
      <p className="courseDescription">{description}</p>
      <p className="courseInstructors">Dictado por: {instructors.join(", ")}</p>
      <h2 className="courseSubtitle">Periodos:</h2>
      <ul>
        {periods.map((period, index) => (
          <li key={index}>
            Del {period.start} al {period.end} por {period.by}
            {!instructor && (
              <button
                type="button"
                onClick={
                  period.subscribers?.includes(username)
                    ? () => {
                        enroll({
                          title,
                          periods: [
                            ...periods.map((newPeriod) => {
                              if (newPeriod.id === period.id) {
                                return {
                                  ...newPeriod,
                                  subscribers: [
                                    newPeriod.subscribers.filter(
                                      (subscriber) => subscriber !== username
                                    ),
                                  ],
                                };
                              } else {
                                return newPeriod;
                              }
                            }),
                          ],
                          instructors,
                        });
                      }
                    : () => {
                        enroll({
                          title,
                          periods: [
                            ...periods.map((newPeriod) => {
                              if (newPeriod.id === period.id) {
                                return {
                                  ...newPeriod,
                                  subscribers: [
                                    ...newPeriod.subscribers,
                                    username,
                                  ],
                                };
                              } else {
                                return newPeriod;
                              }
                            }),
                          ],
                          instructors,
                        });
                      }
                }
                className={"courseSub"}
              >
                {period.subscribers?.includes(username)
                  ? "Unsubscribe"
                  : "Subscribe"}
              </button>
            )}
          </li>
        ))}
      </ul>

      {instructor && (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const { start, end } = event.target;

            const newPeriod = {
              by: username,
              start: start.value,
              end: end.value,
            };

            enroll({
              title,
              periods: [...periods, newPeriod],
              instructors,
            });
          }}
        >
          <label className="formLabel">
            Dictar del:
            <input name="start" type="date" />
          </label>
          <label className="formLabel">
            al:
            <input name="end" type="date" />
          </label>
          <button type="submit" className="courseSub">
            Dictar
          </button>
        </form>
      )}
    </div>
  );
}

export default Course;
