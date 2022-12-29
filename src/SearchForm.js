import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Result from "./Result";

const SearchForm = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [api, setApi] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (api) {
      fetch(api.trim())
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((result) => {
          setData(result);
          setIsPending(false);
          // console.log(data);
        })
        .catch((err) => {
          setIsPending(false);
          console.log(err.message);
        });
    }
  }, [api, isPending]);

  const handleSubmitFetch = (e) => {
    e.preventDefault();
    setIsPending(true);
    const api = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=links&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${text}`;
    setApi(api);
  };

  return (
    <div>
      <Container className="border rounded bg-info p-3 my-5">
        <form onSubmit={handleSubmitFetch}>
          <Row>
            <Col xs={9} md={10} xl={11}>
              <input
                className="bg-info"
                type="text"
                placeholder="type and press enter to search"
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ fontSize: "21px" }}
              />
            </Col>
            <Col>
              <button>
                <span>
                  <AiOutlineSearch size={"30px"} />
                </span>
              </button>
            </Col>
          </Row>
        </form>
      </Container>
      <Container className="p-0 mt-4 ">
        {isPending && <h2 className="text-info">...Loading</h2>}
        {data &&
          data.query.search.map((search) => (
            <Result key={search.pageid} {...search} />
          ))}
      </Container>
    </div>
  );
};
export default SearchForm;
