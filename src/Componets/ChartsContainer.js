
import {Bar} from 'react-chartjs-2'

const ChartsContainer = () => {
    //   const {users, components, isLoading} = useSelector((state)=> state.dashboard)
  return (

    <Bar 
    data={{
        labels: ['red','dd','ff','ee','we','rtted'],
        datasets:[
            {
                label: '# of votes',
                data: [12,19,3,5,2,3],
            },
        ],
    }}
    height={400}
    width={600}
    />
  )
}

export default ChartsContainer