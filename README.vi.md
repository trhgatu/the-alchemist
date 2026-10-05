# The Alchemist

[English](README.md) | **Tiếng Việt**

> _"Trong điệu vũ giả kim của sự tồn tại, cái mới không thể thành hình cho đến khi cái cũ được buông bỏ."_

Portfolio của tôi, viết thành một cuốn sách theo _Nhà Giả Kim_ của Paulo Coelho. Không phải bản liệt kê kinh nghiệm, mà là câu chuyện tôi đã học cách tạo ra mọi thứ như thế nào, kể theo các giai đoạn của Đại Công Trình: bắt đầu bên lò rèn, đi qua màn đêm, và kết thúc lúc bình minh trên sa mạc.

**Xem trực tiếp:** [thatu.is-a.dev](https://thatu.is-a.dev) · có tiếng Anh và tiếng Việt

![Cái tên](.github/assets/hero.webp)

## Cuốn sách

### Mở đầu

Nhà giả kim nào cũng bắt đầu từ một cái tên và một ngọn lửa. Ba câu nói mở đầu cuốn sách đã gói trọn mọi điều phía sau: cái cũ phải được buông bỏ, thử thách là thứ tôi luyện ý chí, và ai bước ra khỏi lò luyện cũng không còn là người cũ.

![Vào trong lửa](.github/assets/portal.webp)
![Câu nói đầu tiên](.github/assets/quote.webp)

### I. Nhà Giả Kim

Tôi đã đến với việc tạo ra mọi thứ như thế nào, kể qua bốn giai đoạn của Đại Công Trình. **Nigredo**, những năm lạc lối trong bóng tối. **Albedo**, những dòng code đầu tiên và đốm lửa nhỏ chúng thắp lên. **Citrinitas**, cái đêm mọi thứ bỗng trở nên rõ ràng. **Rubedo**, công việc vẫn còn đang tiếp diễn.

![Nhà Giả Kim](.github/assets/the-alchemist.webp)
![Nigredo](.github/assets/journal.webp)

### II. Cổ thư

Những công cụ tôi đã học được, cất giữ như các câu thần chú trong một cuốn sách cổ. Rời khỏi trang sách, chúng thành những vì sao trên đầu mỗi khi tôi làm việc.

![Cổ thư](.github/assets/grimoire.webp)
![Chòm sao](.github/assets/constellation.webp)

### III. Các tác phẩm

Những gì ngọn lửa đã làm ra cho đến giờ. Mỗi tác phẩm là một ngôi sao trên quỹ đạo của riêng nó, và mỗi cái có một trang riêng.

![Các tác phẩm](.github/assets/craftings.webp)

### IV. Hành trình

Đêm nhường chỗ cho bình minh. Cuốn sách khép lại ở nơi câu chuyện của Santiago khép lại, giữa sa mạc, với chữ đã có từ trước khi mọi chuyện bắt đầu: _Maktub_, mọi thứ đã được viết sẵn.

![Những câu nói cuối](.github/assets/closing.webp)
![Maktub](.github/assets/maktub.webp)

### Trang cuối

Một lời mời viết thư.

![Trang cuối](.github/assets/footer.webp)

### Từng tác phẩm

Mỗi tác phẩm còn có trang riêng, với câu chuyện, công nghệ và thêm nhiều hình ảnh của nó.

![Tất cả tác phẩm](.github/assets/craftings-index.webp)
![Một tác phẩm](.github/assets/detail.webp)

## Phía sau trang sách

- **Cái tên** là một shader WebGL2 duy nhất (OGL), gồm tờ giấy, con chữ và ngọn lửa bên trong. Con chữ được vẽ một lần thành mặt nạ, nên vẫn sắc nét dù camera tiến gần đến đâu.
- **Khung sương mù** quanh mọi tấm ảnh là một shader làm viền ảnh tan vào làn sương, cuộn theo con trỏ.
- **Cổ thư** là một cảnh React Three Fiber, gồm cuốn sách, vòng tròn ma thuật và các công nghệ nó thả ra.
- **Khi chuyển trang**, một shader nhiễu OGL đốt cháy màn hình rồi hé mở lại.

### Giữ cho mượt

- **Một nhịp đồng hồ chung.** Lenis, GSAP, các shader OGL và các cảnh R3F cùng chạy trên một `gsap.ticker` (`src/lib/frame.ts`). Lenis chạy trước, nên mỗi khung hình đều vẽ theo vị trí cuộn đã ổn định.
- **Chỉ vẽ thứ đang thấy.** Mỗi hiệu ứng ngừng vẽ khi ra khỏi màn hình hoặc đã mờ hẳn.
- **Ít WebGL context.** Mọi khung sương mù vẽ chung vào một canvas qua `<View>` của drei.
- **Chỉ animate thuộc tính rẻ.** Chuyển động chỉ dùng transform, opacity và uniform của shader. Không có blur hay text-shadow chuyển động.
- **Mức chất lượng** (`src/lib/quality.ts`). Máy ít RAM, điện thoại cấu hình vừa phải và người bật giảm chuyển động được dùng shader nhẹ hơn. Các máy còn lại được đo nhanh tốc độ khung hình, và tự hạ mức nếu không theo kịp. Thêm `?quality=high` hoặc `?quality=low` để ép một mức.

## Công nghệ

- **[Next.js 15](https://nextjs.org)** (App Router, Turbopack) · **React 19** · **TypeScript**
- **[GSAP](https://gsap.com)** với `ScrollTrigger`, và **[Lenis](https://lenis.darkroom.engineering)** cho cuộn mượt
- **[React Three Fiber](https://r3f.docs.pmnd.rs)** và **drei**
- **[OGL](https://github.com/oframe/ogl)** cho các shader toàn màn hình
- **Zustand** cho trạng thái ứng dụng và ngôn ngữ EN / VI, **TanStack Query** cho dữ liệu dự án
- **Tailwind CSS v4**, chữ dùng Kings và EB Garamond

## Chạy thử

```bash
pnpm install
pnpm dev
```

Mở [localhost:3000](http://localhost:3000). Các tác phẩm nằm ở `src/features/alchemist/craftings/constants/mock-projects.ts`, còn toàn bộ chữ của trang, cả hai ngôn ngữ, nằm ở `src/constants/translations.ts`.

## Ghi nhận

Câu chuyện mượn hình hài và các câu nói từ _Nhà Giả Kim_ của Paulo Coelho. Mã nguồn dùng giấy phép MIT (xem [LICENSE](LICENSE)).

---

Làm bởi **trhgatu**. [GitHub](https://github.com/trhgatu)

**Maktub.**
