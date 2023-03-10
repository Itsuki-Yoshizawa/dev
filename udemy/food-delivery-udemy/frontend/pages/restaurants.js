import { Row, Card, CardBody, CardImg, CardTitle, Col, Button } from "reactstrap";
import Link from "next/link";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { ButtonHTMLAttributes, filter, toLowerCase, includes } from "react";
import { useRouter } from "next/router"

const GET_RESTAURANT_DESHES = gql`
    query ($id: ID!) {
        restaurant(id: $id) {
            id
            name
            dishes {
                id
                name
                description
                price
                image {
                    url
                }
            }
        }
    }
`;

const Restaurants = (props) => {
    const router = useRouter();
    const { loading, error, data } = useQuery(GET_RESTAURANT_DESHES, {
        variables: {id: router.query.id},
    });

    if(error) return "レストランの読み込みに失敗しました";

    if(loading) return <h1>読み込み中・・・</h1>;
    
    if(data) {
        const { restaurant } = data;
        return (
            <>
                <h1>{restaurant.name}</h1>
                <Row>
                    {restaurant.dishes.map((res) => (
                        <Col xs="6" sm="4" key={res.id} style={{ padding: 0 }}>
                            <Card style={{ margin: "0 10px" }}>
                                <CardImg src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`} top={true} style={{ height: 250 }} />
                                <CardBody>
                                    <CardTitle>{res.name}</CardTitle>
                                    <CardTitle>{res.description}</CardTitle>
                                </CardBody>
                                <div className="card-footer">
                                    <Button outline color="primary">
                                        + カートに入れる
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
        
                    <style jsx>
                        {`
                            a {
                                color: white;
                            }
                            a:link {
                                text-decoration: none;
                                color: white;
                            }
                            a:hover {
                                color: white;
                            }
                            .card-colums {
                                column-connt: 3;
                            }
                        `}
                    </style>
                </Row>
            </>
        );
    } else {
        return <h1>レストランが見つかりませんでした。</h1>
    }
}

export default Restaurants;