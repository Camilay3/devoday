export function responseMiddleware(req, res, next) {
    const json = res.json.bind(res);

    res.json = (body) => {
        if (body && typeof body === 'object' && 'success' in body && 'message' in body && 'data' in body) {
            return json(body);
        }

        if (res.statusCode >= 400) {
            return json({
                success: false,
                message: body?.error ?? body?.message ?? 'Erro na requisição',
                data: body?.errors ?? null,
            });
        }

        return json({
            success: true,
            message: body?.message ?? 'Operação realizada com sucesso',
            data: body?.message ? null : body,
        });
    };

    next();
}
