import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);

  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <MainScreen title={`Welcome Back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Notes
        </Button>
      </Link>

      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}

      {loading && <Loading />}
      {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}

      <Accordion defaultActiveKey="0" flush>
        {notes
          ?.reverse()
          .filter((fnotes) =>
            fnotes.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion.Item eventKey={note._id} key={note._id}>
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header
                      style={{
                        display: "flex",
                        opacity: 0.6,
                        textDecoration: "none",
                      }}
                      as="text"
                      variant="link"
                    >
                      {note.title}
                    </Accordion.Header>
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge variant="success">
                        Category - {note.category}
                      </Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      {/* <ReactMarkdown>{note.content}</ReactMarkdown> */}
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          ))}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
