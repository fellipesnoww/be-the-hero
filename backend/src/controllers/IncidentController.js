const connection = require('../database/connection');

module.exports ={
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);

        console.log(count);
        response.header('X-Total-Count', count['count(*)']); //Faz com que a quantidade total de itens fique disponivel no header da resposta
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //O retorno é um array, pega a informacao de id e salva numa variavel id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;    //Busca o id do caso na url 
        const ong_id = request.headers.authorization;   //Ve que é a ong que esta tentando realizar a exlusao

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({
                error: "Operation Not Permitted."
            });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}