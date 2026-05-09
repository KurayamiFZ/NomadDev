# Python шийдлүүд: Бодлого 1 - 14
# Коммент, дэлгэрэнгүй тайлбарууд Монгол хэл дээр.
import math
from typing import List

# 1) Талын урт a,b,c өгөгдсөн бол гурвалж байх эсэхийг шалгаж, perimeter ба талбайг олно.
def problem1_area_perimeter(a: float, b: float, c: float):
    """Гурвалж болох эсэхийг шалгаад perimeter ба талбайг буцаана. Хэрвээ гурвалж биш бол None."""
    # Гурвалжийн нөхцөл: ямар ч хоёр талын нийлбэр гурав дахь тай их байх
    if a + b > c and a + c > b and b + c > a:
        p = a + b + c
        s = p / 2.0
        # Heron's formula
        area = math.sqrt(max(0.0, s * (s - a) * (s - b) * (s - c)))
        return {"perimeter": p, "area": area}
    else:
        return None

# 2) 100-аас бага тэгш тоонуудыг "do-while" мэт болгон хэвлэх (Python-д while ашигласан)
def problem2_print_evens_do_style(limit=100):
    """100-аас бага бүх тэгш тоонуудыг 'do-while' маягаар хэвлэнэ."""
    i = 0
    evens = []
    # do-while emulate: хамгийн бага нэг удаа гүйцэтгэж, дараа нөхцлийг шалгана
    while True:
        if i % 2 == 0 and i < limit:
            evens.append(i)
        i += 1
        if not (i < limit):
            break
    return evens

# 3) n тоон цувааны үржвэрийг while ашиглан тооцоолох
def problem3_product_of_sequence(numbers: List[float]):
    """Өгсөн numbers жагсаалтын үржвэрийг while ашиглан олоно."""
    i = 0
    prod = 1
    if not numbers:
        return 0  # хоосон цуваа бол 0 гэж авч болно эсвэл 1 гэж ч авч болно; энд 0 буцаав
    while i < len(numbers):
        prod *= numbers[i]
        i += 1
    return prod

# 4) For давталт ашиглан 1-ээс n хүртэл 3-аар өсгөж хэвлэх
def problem4_range_step_3(n: int):
    """1-ээс n хүртэл 3-аар өсөх тоонуудыг буцаана."""
    return list(range(1, n+1, 3))

# 5) For давталт ашиглан 1-ээс 10 хүртэлх тоонуудын нийлбэрийг олох
def problem5_sum_1_to_10():
    s = 0
    for i in range(1, 11):
        s += i
    return s

# 6) Өгсөн a тооны 1..n хүртэл зэрэглүүдийг хэвлэх
def problem6_powers(a: float, n: int):
    """a^1, a^2, ..., a^n-ийг буцаана (жагсаалт)."""
    return [a ** i for i in range(1, n+1)]

# 7) Өгсөн тэмдэгт мөрийг (жнь: "hello") n удаа давтан мөр бүрт хэвлэх
def problem7_repeat_string(s: str, n: int):
    """s-ийг n удаа шинэ мөрөнд хэвлэнэ (жагсаалтаар буцаана)."""
    return [s for _ in range(n)]

# 8) 1-ээс n хүртэлх сондгой тоонуудын нийлбэр (сонгдог->"сонгдой" гэж ойлгов)
def problem8_sum_odds(n: int):
    """1..n хүртэлх сондгой тоонуудын нийлбэр."""
    total = 0
    for i in range(1, n+1, 2):
        total += i
    return total

# 9) Өгсөн m тооны 1..m хүртэлх тоонуудын квадрат болон куб-ыг хэвлэх
def problem9_squares_cubes_up_to_m(m: int):
    """1..m хүртэлх бүх тооны квадрат ба куб-ыг тэнц хосомоор буцаана:
       буцаана: [(num, num^2, num^3), ...]"""
    return [(i, i**2, i**3) for i in range(1, m+1)]

# 10) 2-оос 100 хүртэлх бүх тэгш тоог for ашиглан хэвлэх
def problem10_evens_2_to_100():
    return [i for i in range(2, 101) if i % 2 == 0]

# 11) 1-ээс 100 хүртэлх бүх сондгой тоог while ашиглан хэвлэх
def problem11_odds_1_to_100_while():
    i = 1
    odds = []
    while i <= 100:
        if i % 2 == 1:
            odds.append(i)
        i += 1
    return odds

# 12) Өгсөн n бүхэл тооны факториал
def problem12_factorial(n: int):
    """n! олно. Бодитойгоор n>=0 гэж авна."""
    if n < 0:
        raise ValueError("Факториал нь сөрөг тоонд тодорхойгүй.")
    res = 1
    for i in range(2, n+1):
        res *= i
    return res

# 13) Өгсөн n хүртэлх сондгой тоонуудын факториалуудын нийлбэр
def problem13_sum_factorials_of_odds(n: int):
    """1..n хүртэлх сондгой тоонуудын факториалуудын нийлбэрийг тооцно."""
    total = 0
    for i in range(1, n+1, 2):  # сондгой
        total += problem12_factorial(i)
    return total

# 14) [50,100] завсарт орших 7-д хуваагддаг тоонуудын цифрүүдийн нийлбэрийг олох
def problem14_digit_sums_div7_in_50_100():
    """50..100 дахь 7-оор хуваагддаг бүх тоонуудын цифрүүдийн нийлбэрийг буцаана.
       Мөн хэрвээ шаардлагатай бол тухайн тооны цифрийн нийлбэрүүдийн жагсаалтыг буцаана."""
    results = []
    for num in range(50, 101):
        if num % 7 == 0:
            digit_sum = sum(int(d) for d in str(abs(num)))
            results.append((num, digit_sum))
    # Нийлбэр: бүх тоонуудын цифрүүдийн нийлбэрийн нийлбэр
    total_digit_sum = sum(x[1] for x in results)
    return {"pairs": results, "total_digit_sum": total_digit_sum}


# ----- Хялбархан турших меню ----- #
def menu():
    print("Бодлого 1-14 Python шийдлүүд. Жишээ харахыг хүсвэл дараагийн мөрүүдийг уншина уу.\n")

    # 1-р жишээ
    print("1) Гурвалж шалгах, perimeter ба талбай:")
    print("   sides = (3,4,5) ->", problem1_area_perimeter(3,4,5))

    # 2
    print("\n2) 100-аас бага тэгш тоонууд (do-while стиль):")
    print(problem2_print_evens_do_style())

    # 3
    print("\n3) Цувааны үржвэр (while): numbers=[2,3,4] ->", problem3_product_of_sequence([2,3,4]))

    # 4
    print("\n4) 1..n 3-аар өсгөх: n=10 ->", problem4_range_step_3(10))

    # 5
    print("\n5) 1..10 нийлбэр ->", problem5_sum_1_to_10())

    # 6
    print("\n6) a^1..a^n: a=2,n=5 ->", problem6_powers(2,5))

    # 7
    print("\n7) Тэмдэгт мөрийг дахин хэвлэх: 'hi',3 ->", problem7_repeat_string("hi",3))

    # 8
    print("\n8) 1..n сондгой нийлбэр: n=10 ->", problem8_sum_odds(10))

    # 9
    print("\n9) 1..m квадрат, куб: m=5 ->", problem9_squares_cubes_up_to_m(5))

    # 10
    print("\n10) 2..100 тэгшүүд ->", problem10_evens_2_to_100())

    # 11
    print("\n11) 1..100 сондгой (while) ->", problem11_odds_1_to_100_while())

    # 12
    print("\n12) n! : 6! ->", problem12_factorial(6))

    # 13
    print("\n13) 1..n сондгой тоонуудын факториалуудын нийлбэр: n=7 ->", problem13_sum_factorials_of_odds(7))

    # 14
    print("\n14) 50..100 дахь 7-оор хуваагддаг тоонуудын цифр нийлбэр:")
    print(problem14_digit_sums_div7_in_50_100())

if __name__ == "__main__":
    # Терминалд ажиллуулахад бүх жишээнүүдийг хэвлэх
    menu()
