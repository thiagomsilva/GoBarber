/**
 * ATENÇÃO!!!
 *
 * CORRIGIR ERRO: USUÁRIO Ñ PODE MARCAR UM AGENDAMENTO COM ELE MESMO.
 *
 * req.userId do AppointmentController ñ pode ser o mesmo que o provider_id
 *
 */
import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const CheckisProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!CheckisProvider) {
      return res.status(401).json({
        error: 'Apenas o prestador de serviço pode carregar as notificações',
      });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })

      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
